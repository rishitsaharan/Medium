import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";

export const Blogs =() => {
    const {isLoading, blogs} = useBlogs();
    return <div className="flex flex-col justify-center p-4">
        <div>
            <AppBar 
                author="Rishit"
            />
        </div>
        {isLoading ? <div>
            Loading...
        
        </div> 
        
        
        :   <div className="flex justify-center">
                <div className="">
                    {blogs.map((blog) => <BlogCard 
                            key={blog.id}
                            id={blog.id}
                            author={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="2nd Feb 2024"
                        />)
                    } 
                </div>
            </div>
        }
    </div>
};