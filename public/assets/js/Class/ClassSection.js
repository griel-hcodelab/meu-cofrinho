class Section
{

    changeSection(hash)
    {
        document.querySelectorAll("section").forEach((tag)=>{
            tag.classList.remove("show");
        })
        switch(hash)
        {
            default:
                document.querySelector("#vaults").classList.add("show")
            break;
            case '#new':
                document.querySelector("#new_vault").classList.add("show")
            break;
            case '#edit_vault':
                document.querySelector("#edit_vault").classList.add("show")
            break;
        }
    }

}

export default Section;