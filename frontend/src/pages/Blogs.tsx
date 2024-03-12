import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";

export const Blogs =() => {
    const {isLoading, blogs, tokenExists} = useBlogs();
    const navigate = useNavigate();

    if(!tokenExists){
        alert("Signin Failed");
        navigate("/signin");
        return <div></div>
    }
    return <div className="flex flex-col justify-center">
        <div>
            <AppBar 
                author="Rishit"
            />
        </div>
        {isLoading ? <div className="flex justify-center">
            <div className="">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
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