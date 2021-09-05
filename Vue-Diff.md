## Vue-Diff

### 1、patch函数

1. 在这一系列的函数里面，有很多的钩子函数，类似于 destory 和 create 、insert 的 钩子函数，事实上 这些 钩子函数 用户使用的时候是无知觉的，因为 这个是虚拟 dom 的组件的 钩子函数，类似于 style 组件，事件 on 组件，这些 钩子函数
2. 在 patch 函数里，调用了 核心函数 ***patchVnode*** 函数，也正是 这个函数，调用了 ***diff ：updateChildren 函数***
3. 主要函数判断了老节点是否存在，然后执行销毁或者创建，然后执行 ***patchVnode***

```js
// 用于比较新旧节点的不同，然后更新的函数
return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 当新节点不存在的时候，销毁旧节点
    if (isUndef(vnode)) {
        if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
        return
    }

    let isInitialPatch = false
    // 用来储存 insert 钩子函数，在插入节点后调用
    const insertedVnodeQueue = []
    // 如果旧节点是未定义的，直接创建新节点
    if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true
        createElm(vnode, insertedVnodeQueue)
    } else {
        const isRealElement = isDef(oldVnode.nodeType)
        // 如果旧节点不是真实的DOM节点，当两个节点是相同节点时，进入patchVnode函数
        // 而 patchVnode 也是传说中 diff updateChildren的调用者
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // patch existing root node
            patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
        } else {
            // 当旧节点时真实存在的DOM节点时
            if (isRealElement) {
                // 当旧节点时真实DOM，并且是在SSR环境下，修改SSR_ATTR属性
                if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                    oldVnode.removeAttribute(SSR_ATTR)
                    hydrating = true
                }
                if (isTrue(hydrating)) {
                    if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                        invokeInsertHook(vnode, insertedVnodeQueue, true)
                        return oldVnode
                    } else if (process.env.NODE_ENV !== 'production') {
                        warn(
                            'The client-side rendered virtual DOM tree is not matching ' +
                            'server-rendered content. This is likely caused by incorrect ' +
                            'HTML markup, for example nesting block-level elements inside ' +
                            '<p>, or missing <tbody>. Bailing hydration and performing ' +
                            'full client-side render.'
                        )
                    }
                }
                // either not server-rendered, or hydration failed.
                // create an empty node and replace it
                // 设置 oldVnode 为一个包含 oldVnode的无属性节点
                oldVnode = emptyNodeAt(oldVnode)
            }

            // replacing existing element
            const oldElm = oldVnode.elm 
            // 获取父节点，这样方便删除或者增加节点
            const parentElm = nodeOps.parentNode(oldElm)

            // create new node
            // 在dom中插入新节点
            createElm(
                vnode,
                insertedVnodeQueue,
                // extremely rare edge case: do not insert if old element is in a
                // leaving transition. Only happens when combining transition +
                // keep-alive + HOCs. (#4590)
                oldElm._leaveCb ? null : parentElm,
                nodeOps.nextSibling(oldElm)
            )
            // 递归更新父占位符元素
            // 就是执行一遍父节点的destroy和create、insert的钩子函数
            if (isDef(vnode.parent)) {
                let ancestor = vnode.parent
                const patchable = isPatchable(vnode)
                while (ancestor) {
                    for (let i = 0; i < cbs.destroy.length; ++i) {
                        cbs.destroy[i](ancestor)
                    }
                    ancestor.elm = vnode.elm
                    if (patchable) {
                        for (let i = 0; i < cbs.create.length; ++i) {
                            cbs.create[i](emptyNode, ancestor)
                        }
                        // #6513
                        // invoke insert hooks that may have been merged by create hooks.
                        // e.g. for directives that uses the "inserted" hook.
                        const insert = ancestor.data.hook.insert
                        if (insert.merged) {
                            // start at index 1 to avoid re-invoking component mounted hook
                            for (let i = 1; i < insert.fns.length; i++) {
                                insert.fns[i]()
                            }
                        }
                    } else {
                        registerRef(ancestor)
                    }
                    ancestor = ancestor.parent
                }
            }

            // 销毁旧节点
            if (isDef(parentElm)) {
                removeVnodes([oldVnode], 0, 0)
            } else if (isDef(oldVnode.tag)) {
                // 触发旧节点的destroy钩子
                invokeDestroyHook(oldVnode)
            }
        }
    }
    // 执行虚拟dom的insert钩子
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    // 返回最新的vnode的elm，也就是真实的dom节点
    return vnode.elm
}
```

### 2、patchVnode 函数

patchVnode 函数是对比 两个虚拟 dom 不同的地方， 同时 也是 递归 调用 updateChildren 的 函数

1. 首先看是否是同一个节点、是否是 注释节点、是否是 异步函数组件、是否是静态节点，是否是 once 的节点，是的话，不执行
2. 是否存在子节点，然后新老节点的子节点是否相同，否就执行 updateChildren 函数深入对比
3. 否则就查看新老节点是否存在，新节点存在但是老节点不存在，增加，新节点不存在但是老节点存在，删除
4. 检查 新老节点的 text 属性是否一致，否的话，就更新

```js
// 对比 两个虚拟 dom 不同的地方，同时 也是 递归 调用 updateChildren 的 函数
  function patchVnode (
    oldVnode, // 旧节点
    vnode,  // 新节点
    insertedVnodeQueue, // 插入节点的队列
    ownerArray, // 节点 数组
    index,  // 当前节点的索引
    removeOnly // 只有在patch函数中被传入，当旧节点不是真实DOM节点，当新旧节点是相同节点的时候
  ) {
    // 如果新旧节点相等
    // 直接返回，就是当props没有改变时，子组件不会渲染，而是直接复用
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = vnode.elm = oldVnode.elm
    // 当 当前节点 是 注释节点（被 v-if）了，或者是个 异步函数节点，那就不执行
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
      } else {
        vnode.isAsyncPlaceholder = true
      }
      return
    }

    // 当前节点是一个静态节点的时候，或者标记了 once 的时候，那不执行
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance
      return
    }

    let i
    const data = vnode.data
    // 调用 prepatch 钩子
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }

    const oldCh = oldVnode.children
    const ch = vnode.children
    // 调用 update 钩子
    if (isDef(data) && isPatchable(vnode)) {
      // 这里的 update 钩子 是 vnode 本身的钩子
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      // 这里的 update 钩子 是 用户传过来的钩子
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    // 判断新节点有无 text 属性
    if (isUndef(vnode.text)) {
      // 如果都有子节点，对比更新子节点
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) { // 新节点存在，但是旧节点不存在
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        // 如果旧节点是 text  清空
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        // 增加子节点
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) { // 旧节点存在，但是新节点不存在，执行删除
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) { // 如果是旧节点的 text， 清空
        nodeOps.setTextContent(elm, '')
      }
      // 新旧节点 text 属性不一样
    } else if (oldVnode.text !== vnode.text) {
      // 将 text 设置为 新节点的 text
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      // 执行 postpatch 钩子
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
```

### 3、createElm

将 vnode 转换为 真实的 dom 节点

1. 判断当前的 vnode tag 标签是否是存在的
2. 如果存在，创建对应的节点，然后 设置 样式的 作用域 
3. 遍历子元素，并插入节点之中
4. 触发 create 钩子函数
5. 如果tag 标签不存在，判断是否是 注释节点，然后创建
6. 如果tag 标签不存在，且不是 注释节点，直接创建文本节点

```js
 // 将vnode转换为真实的dom节点
  function createElm (
    vnode,              // 新节点
    insertedVnodeQueue, // inserted钩子
    parentElm,
    refElm,             // 如果这个存在的话，就插到这个节点之前
    nested,
    ownerArray,
    index
  ) {
    // 如果存在子节点，就会克隆一遍
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    vnode.isRootInsert = !nested // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    // 是否是标签
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++
        }
        // 如果是一个未定义标签
        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          )
        }
      }
      // 是否有命名空间
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode) // 设置样式的作用域

      /* istanbul ignore if */
      // 判断是否是WEEX环境
      if (__WEEX__) {
        // in Weex, the default insertion order is parent-first.
        // List items can be optimized to use children-first insertion
        // with append="tree".
        const appendAsTree = isDef(data) && isTrue(data.appendAsTree)
        if (!appendAsTree) {
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue)
          }
          insert(parentElm, vnode.elm, refElm)
        }
        createChildren(vnode, children, insertedVnodeQueue)
        if (appendAsTree) {
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue)
          }
          insert(parentElm, vnode.elm, refElm)
        }
      } else {
        // 把子元素设置为 vnode 的对象
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          // 触发 create 钩子
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        // 将创建好的vnode 插入 parent中，如果 refElm存在的话，就插入到refElm元素之前
        insert(parentElm, vnode.elm, refElm)
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--
      }
    } else if (isTrue(vnode.isComment)) { // 是否是注释节点
      vnode.elm = nodeOps.createComment(vnode.text) // 创建 注释的文本 节点
      insert(parentElm, vnode.elm, refElm)
    } else { // Text 标签
      vnode.elm = nodeOps.createTextNode(vnode.text) // 创建文本节点
      insert(parentElm, vnode.elm, refElm)
    }
  }
```