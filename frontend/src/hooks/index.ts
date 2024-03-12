import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export interface BlogInterface{
    author : {
        name : string
    },
    title : string,
    content : string,
    id : number
}
export const useBlog = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState<BlogInterface>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data);
                setIsLoading(false);
            })
    }, [id])

    return {
        isLoading,
        blog
    }
};
export const useBlogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [tokenExists, setTokenExists] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers : {
                Authorization : `Bearer ` + localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data);
            setIsLoading(false);
        }).catch(response => {
            setTokenExists(false);
        })
    }, []);
    return {
        isLoading,
        blogs,
        tokenExists
    }
};