// client-side js
document.addEventListener("DOMContentLoaded", ()=>{

    document.querySelector('form').onsubmit = (event)=>{
        event.preventDefault();
        let code = document.querySelector('#code').value
        let data = document.querySelector('#data').value
        const url = "http://localhost:3000/bit"
        let test = JSON.stringify({
            code: code,
            data: data
        })
        console.log("sstandard post", code, data, test)
        //setTimeout(alert("4 seconds"),1000); 
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: document.querySelector('#code').value,
                data: document.querySelector('#data').value
            })//body: new FormData(document.getElementById("form"))
            // -- or --
            // body : JSON.stringify({
            // user : document.getElementById('user').value,
            // ...
            // })
        }).then(response=>response.text()// .json(), etc.
        // same as function(response) {return response.text();}
        ).then(html=>console.log(html))
    }

    console.log("what is going on here");
}
)

function hmmm() {
}
