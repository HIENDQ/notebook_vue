function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function write_File(data){
    var fileURL = window.URL.createObjectURL (new Blob (data.content.split('')));
    var fileLink = document.createElement ('a');
    fileLink.href = fileURL;
    fileLink.setAttribute ('download', data.title? data.title:'New file');
    document.body.appendChild (fileLink);
    fileLink.click();
}

export const service = {
    write_File,
    create_UUID,
};
