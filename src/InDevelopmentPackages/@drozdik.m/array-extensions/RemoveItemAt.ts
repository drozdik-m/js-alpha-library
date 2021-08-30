import "./RemoveItemsAt";

//--------------------------------------------------
//---------REMOVE INDEX-----------------------------
//--------------------------------------------------
Array.prototype.removeItemAt = function (index: number): any[]
{
    return this.removeItemsAt([index]);
}