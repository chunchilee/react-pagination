import React from "react";

const BlogPosts = ({ blogPost }) => {
  return (
    <div className="blog-post" >
      <img className="cover-img" src={blogPost.cover.url} alt="" />
      <h2 className="title">{blogPost.title}</h2>
      <p className="description">{blogPost.excert}</p>
      <div className="card-details">
        <div className="lh-details">
          <img
            className="author-img"
            src={blogPost.author.profilePicture.url}
            alt=""
          />
          <p className="date">
            {new Date(`${blogPost.datePublished}`).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <a
          href={blogPost.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Read post
        </a>
      </div>
    </div>
  );
};

export default BlogPosts;
