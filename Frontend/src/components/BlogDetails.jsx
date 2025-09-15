import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();  // get blog id from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog) return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h2>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", textAlign: "center" }}>
      <h2 style={{ color: "#AA8736" }}>{blog.title}</h2>
      <img src={blog.imageUrl} alt={blog.title} style={{ width: "50%",borderRadius: "8px" }} />
      <p style={{ marginTop: "1rem", fontSize: "18px", lineHeight: "1.6" }}>{blog.description}</p>
      {blog.content && <p style={{ marginTop: "1rem" }}>{blog.content}</p>}
    </div>
  );
};

export default BlogDetail;
