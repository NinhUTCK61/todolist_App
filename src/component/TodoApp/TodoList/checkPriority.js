const handleCheckPriority = (priority)=>{
    if(priority === 'Hight')
    {
        return 1;
    }else if(priority === 'Medium'){
        return 0;
    }else if(priority === "Low")
    {
        return -1;
    }
}

export default handleCheckPriority