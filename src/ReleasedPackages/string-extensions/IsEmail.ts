

interface String
{
    /**
     * Tests if input is in format of an email
     * @returns True is sample is in format of an email
     */
    IsEmail(): boolean;
}

//--------------------------------------------------
//---------IS EMAIL---------------------------------
//--------------------------------------------------
String.prototype.IsEmail = function (): boolean
{
    let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(this);
}