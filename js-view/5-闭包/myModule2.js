(function myModule(window){
    // 私有数据
    var msg = 'My Name'
    function doSomething(){
        console.log('doSomething(): ' + msg.toUpperCase());
    }
    function doOtherthing(){
        console.log('doOtherthing(): ' + msg.toLowerCase());
    }
    window.myModule2 = {
        doSomething,
        doOtherthing
    }
})(window)
