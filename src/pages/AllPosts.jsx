import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    });
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Link to={`/post/${post.$id}`}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  {/* ✅ Proper image preview */}
                  <img
                    src={appwriteService.getFileUrl(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="mt-2 font-bold text-lg">{post.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//     </div>
//   )
// }

// export default AllPosts