import reddit from './redditapi';



const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit',e=>{
    // get search term
    e.preventDefault();
const searchTerm = searchInput.value;
//get sort
 const sortBy= document.querySelector('input[name="sortby"]:checked').value;
  
  //get limit
  const searchLimit= document.getElementById('limit').value;
  //check input
  if(searchTerm=== ''){
      showMessage('please add a search term','alert-danger');
  }
  //clear input
  searchInput.value='';
  //search redit
  reddit.search(searchTerm,searchLimit,sortBy).then(results=>{
      console.log(results);
    let output = '<div class="card-columns">';  
    //loop through posts
    results.forEach(post=>{
        //check for image
        const image = post.preview?post.preview.images[0]
        .source.url:
        'https://marketingland.com/wp-content/ml-loads/2014/07/reddit-combo-1920.png';

        output+=`
        <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext,100)}</p>
                <a href="${
                    post.url
                }" target="_blank" class="btn btn-primary">Read More</a>
                <hr>
                <span class="badge badge-secondary">subreddit:${post.subreddit}</span>
            </div>
        </div>
        `;
    });
    output+='</div>';
    document.getElementById('results').innerHTML=output;
  });
   
});

function showMessage(message,className){
    const div=document.createElement('div');
    div.className=`alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const searchContainer = document.getElementById('search-container');
    searchContainer.insertBefore(div,search);
    setTimeout(()=> document.querySelector('.alert').remove(),3000);
}


// truncate text
function truncateText(text,limit){
    const shortened = text.indexOf('',limit);
    if(shortened==-1)return text;
    return text.substring(0,shortened);
}

