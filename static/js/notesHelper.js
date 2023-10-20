let modal = document.getElementById("modal");

    //Get the controls for the modals
    let modalCloser = document.getElementById("modalCloser");
    let modalOpener = document.getElementById("modalOpener");
    let filterResetter = document.getElementById("btnDeleteFilters");

    let checkboxes = document.getElementsByName("cb");

    //Helper variables to filter the list of notes
    let filterCategIds = [];

    const cloneListOfNodes = (container) => {
      let tempList = container.children;
      let retList = [];
      for(let note of tempList) {
        retList.push(note.cloneNode(true));
      }

      return retList;
    }
    
    let listOfNotes = cloneListOfNodes(document.getElementById("noteContainer"));


    //EventListeners and their functions

    modalOpener.addEventListener("click",() => {
      modal.style.visibility = "visible";
    });

    modalCloser.addEventListener("click", () => {
      modal.style.visibility = "hidden";
    });

    //Deleting the filters by resetting all 
    filterResetter.addEventListener("click", (e) => {
      for(let cb of checkboxes) {
        cb.checked = false;

        filterManager(cb.value, false);
      }
    });

    checkboxes.forEach(cb => {
      cb.addEventListener("change", e => {
        filterManager(e.target.value, e.target.checked)
      })
    });

    //If the filter is alredy active don't add it a second time
    const filterManager = (id, isAdd) => {
      if(isAdd) {
        if(filterCategIds.indexOf(id) == -1)
          filterCategIds.push(id);
      }
      else {
        if(filterCategIds.find(x => x.id == id) != 'undefined')
          filterCategIds.splice(filterCategIds.indexOf(id), 1);
      }
      refreshList();
    }

    const refreshList = () => {
      let filteredList = [];
      if(filterCategIds.length == 0) {
        for(let note of listOfNotes) 
          filteredList.push(note);
      }
      else {
        for(let note of listOfNotes) {
          if (note.hasAttribute("data-header") || filterCategIds.indexOf(note.dataset.categoryid) != -1) {
            filteredList.push(note);  
          }
        }
      }


      document.getElementById("noteContainer").replaceChildren(...filteredList)

    }