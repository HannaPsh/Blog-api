window.onload = function() {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try {
        let response = await fetch('http://localhost:5000/posts');
        let posts = await response.json();
        console.log(posts);

        let postsHTML = '';
        for(let post of posts) {
            let postDate = new Date(post.date);
            let formatedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`

            console.log(post['_id'])
            postsHTML += `<tr><td>${post.title}</td>
            <td>${post.author}</td> <td>${post.tags}</td> <td>${formatedDate}</td> <td> <a href="update.html?id=${post['_id']}">Update</a> |
            <a class="delete-link" data-id="${post['_id']}" href="#">Delete</a> </td></tr>`;

        }
        
        document.getElementById('tBody').innerHTML = postsHTML;
    } catch(error) {
        console.log(error);
    }

    deletePost();
}


function deletePost() {
    let deletePosts = document.getElementsByClassName('delete-link');
    

    for (let link of deletePosts) {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            console.log(e.target.dataset.id);

            try {
                await fetch('http://localhost:5000/posts/' + e.target.dataset.id,
                    {
                        method: 'DELETE'
                    }
                );

                e.target.parentNode.parentNode.remove();
            } catch(error) {
                console.log(error)
            }
            
        })
    }
}




