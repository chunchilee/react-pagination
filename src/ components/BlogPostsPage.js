import { request } from "graphql-request";
import React, { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
// import Paginate from "./Paginate";
import ReactPaginate from "react-paginate";

const BlogPostsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { posts } = await request(
        "https://api-us-east-1.hygraph.com/v2/cl3zo5a7h1jq701xv8mfyffi4/master",
        `
    {
      posts {
          id
          title
          excert
          postUrl
          cover {
          url
          }
          datePublished
          author {
          firstName
          profilePicture {
            url
          }
          }
      }
    }
  `
      );
      setBlogPosts(posts);
    };
    fetchBlogPosts();
  }, []);
  console.log(blogPosts);
  // 每頁只顯示3個posts，利用當前頁碼來決定從data中取出的排序
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber) => {
  //   return setCurrentPage(pageNumber);
  // };

  // const previousPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPage !== Math.ceil(blogPosts.length / postsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const paginate = ({ selected }) => {
    console.log(selected);
    setCurrentPage(selected + 1);
  };

  const renderBlogPosts = currentPosts.map((blogPost) => {
    return <BlogPosts key={blogPost.id} blogPost={blogPost} />;
  });

  return (
    <div className="container">
      <div className="title">
        <h1>Blog</h1>
      </div>
      {blogPosts ? (
        <div className="blog-content-section">
          <div className="blog-container">{renderBlogPosts}</div>
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(blogPosts.length / postsPerPage)}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-number"}
            previousLinkClassName={"page-number"}
            nextLinkClassName={"page-number"}
            activeClassName={"active"}
          />
          {/* <Paginate
            postsPerPage={postsPerPage}
            totalPosts={blogPosts.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          /> */}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default BlogPostsPage;
