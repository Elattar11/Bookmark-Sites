
var regExBookMark = /[a-zA-Z]{3}/;
var regExURL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");

document.getElementById("bookmarkName").addEventListener("input" , function(e){

    
    if (regExBookMark.test(siteName.value)) {

        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    }
    else
    {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }

})

document.getElementById("bookmarkURL").addEventListener("input" , function(e){

    if (regExURL.test(siteURL.value)) {

        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
    }
    else
    {
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
    }

})

var myData; 

createArray(myData);
function createArray(arr)
{
    if(localStorage.getItem("ourStorage") == null)
    {
        myData = [];
    }
    else
    {
        myData = JSON.parse(localStorage.getItem("ourStorage"));
        displayData();
    }
}


document.getElementById("submitBtn").addEventListener("click",function(e){

    if(validateInputs() == false)
    {
        return;
    }
    else
    {
        addSite();
    }

});
function validateInputs()
{
    if(siteName.value == "" || !regExBookMark.test(siteName.value))
    {
        swal({
            title:"Error!",
            text:"You must enter Valid Site Name",
            icon:"error",
            buttons:"OK", 
            className:"rak"
        });
        return false;
    }
    
    if(siteURL.value == "" || !regExURL.test(siteURL.value))
    {
        swal({
            title:"Error!",
            text:"You must enter Valid Site URL",
            icon:"error",
            buttons:"Ok",
            className:"rak"
            
        });
        return false;
    }
    return true;
}

function addSite()
{
    var siteData = 
        {
            sName : siteName.value, 
            sURL : siteURL.value, 
        };

        pushInArray(myData , siteData);
        displayData();  
        clearData();

        reloadPage();
}

function reloadPage()
{
    swal({
        title:"Done",
        text:"Site Added Successfully...",
        icon:"success",
        buttons:"Ok",
        className:"done"
        
    });
    siteName.classList.add("is-invalid");
    siteURL.classList.add("is-invalid");
}

function pushInArray(arr , obj)
{
    arr.push(obj);
    addInLocalStorage(arr);
}

function addInLocalStorage(arr)
{
    localStorage.setItem("ourStorage" , JSON.stringify(arr))
}

function displayData()
{
    var hasalah = ``;
    for(var i=0; i<myData.length; i++)
    {
        hasalah += `<tr>
        <td>${i}</td>
        <td>${myData[i].sName}</td>
        
        <td>
          <button id="btnVisit" onclick="visitSite(${i})" class="btn btn-outline-primary">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit
        </button>
        </td>
        <td>
          <button id="btnDelete" onclick="deleteSite(${i})" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button>
        </td>
    </tr>`;
    }

    document.getElementById("tableContent").innerHTML = hasalah;
}

function visitSite(sIndex)
{
    window.open(myData[sIndex].sURL,"_blank");
}

function deleteSite(pIndex)
{
    swal({
        title: "Are you sure, you want to delete this site ?",
        text: "Once deleted, you will not be able to recover this site!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            myData.splice(pIndex , 1);
            displayData();
            addInLocalStorage(myData);
          swal("Your Site has been deleted!", {
            icon: "success",
            className:"done",
            
          });
        } else {
          swal("Your Site was not deleted!" , {className:"done"});
        }
      });
}

function searchSite(userWord)
{
    var hasalah = "";

    for(var i =0; i< myData.length; i++)
    {
        if(myData[i].sName.toLowerCase().includes(userWord.toLowerCase()))
        {
            hasalah += `<tr>
                <td>${i}</td>
                <td>${myData[i].sName}</td>
                
                <td>
                <button id="btnVisit" onclick="visitSite(${i})" class="btn btn-outline-primary">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </button>
                </td>
                <td>
                <button id="btnDelete" onclick="deleteSite(${i})" class="btn btn-outline-danger">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
                </td>
            </tr>`;
        }
    }

    document.getElementById("tableContent").innerHTML = hasalah;
}


function clearData()
{
    siteName.value = "";
    siteURL.value = "";
}





