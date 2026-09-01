import React, { useEffect, useMemo, useState } from "react";
import "./OurBlog.css";
import "./BlogListingUpdate.css";
import BlogCard from "./BlogCard";
import { useAuth } from "../../store/auth";

function BlogAll() {
  const { API } = useAuth();
  const [neoblog, setNeoblog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const BLOGS_PER_PAGE = 12;

  useEffect(() => {
    if (!API) return; 
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/blogs/view-blogs`, {
          method: "GET",
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || `Failed to fetch blogs (${response.status})`);
        }

        let blogs = [];
        if (Array.isArray(data)) blogs = data;
        else if (Array.isArray(data?.Blog)) blogs = data.Blog;
        else if (Array.isArray(data?.blogs)) blogs = data.blogs;
        else if (Array.isArray(data?.data)) blogs = data.data;

        const activeBlogs = blogs
          .filter((blog) => blog?.blog_status === true)
          .sort(
            (a, b) =>
              new Date(b.blog_date || b.date || b.created_at || b.createdAt) -
              new Date(a.blog_date || a.date || a.created_at || a.createdAt)
          );

        if (!controller.signal.aborted) setNeoblog(activeBlogs);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching blogs:", err);
          setError(err.message || "Unable to load blogs.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [API]);

  const getCategory = (blog) => {
    const raw =
      blog?.category ||
      blog?.category_name ||
      blog?.categoryName ||
      blog?.speciality ||
      blog?.speciality_name ||
      blog?.specialityName ||
      blog?.department ||
      blog?.department_name ||
      blog?.departmentName ||
      blog?.blog_category ||
      blog?.blog_speciality;

    if (raw && typeof raw === "object") {
      return (
        raw.title ||
        raw.name ||
        raw.category_name ||
        raw.speciality_name ||
        raw.slug ||
        ""
      );
    }
    return typeof raw === "string" ? raw.trim() : "";
  };

  const categories = useMemo(() => {
    const values = new Set();
    neoblog.forEach((blog) => {
      const category = getCategory(blog);
      if (category) values.add(category);
    });
    return ["All", ...Array.from(values).sort((a, b) => a.localeCompare(b))];
  }, [neoblog]);

  const filteredBlogs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return neoblog.filter((blog) => {
      const category = getCategory(blog);
      const title = String(blog?.blog_title || "").toLowerCase();
      const content = String(blog?.blog_content || "").toLowerCase();
      const author = String(blog?.blog_auther || "").toLowerCase();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        content.includes(search) ||
        author.includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [neoblog, searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const pageBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-container">
        <p style={{ color: "red" }}>Error loading blogs: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!neoblog.length) {
    return (
      <div className="loader-container">
        <p>No blogs found.</p>
      </div>
    );
  }

  const first = filteredBlogs.length ? (currentPage - 1) * BLOGS_PER_PAGE + 1 : 0;
  const last = Math.min(currentPage * BLOGS_PER_PAGE, filteredBlogs.length);

  return (
    <div className="blog-listing">
      <div className="blog-listing-toolbar">
        <div className="blog-search-wrap">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search health blogs..."
            aria-label="Search health blogs"
          />
          {searchTerm && (
            <button
              type="button"
              className="blog-search-clear"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <i className="fa fa-times"></i>
            </button>
          )}
        </div>

        <div className="blog-filter-wrap">
          <label htmlFor="blog-category-filter">
            <i className="fa fa-filter"></i>
            Speciality
          </label>
          <select
            id="blog-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="blog-results-bar">
        <p>
          {filteredBlogs.length
            ? `Showing ${first}-${last} of ${filteredBlogs.length} blogs`
            : "No blogs match your search"}
        </p>

        {(searchTerm || selectedCategory !== "All") && (
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {pageBlogs.length ? (
        <div className="row blog-results-grid">
          {pageBlogs.map((value, index) => (
            <div
              className="col-lg-4 col-md-6 col-12 blog-listing-card-col"
              key={value._id || value.id || value.blog_id || value.blog_slug || index}
            >
              <BlogCard
                blogimage={
                  value.blog_image
                    ? `${API}/uploads/blogs/${value.blog_image}`
                    : ""
                }
                title={value.blog_title}
                description={value.blog_content}
                blogslug={value.blog_slug}
                author={value.blog_auther}
                blogdate={value.blog_date}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="blog-no-results">
          <div className="blog-no-results-icon">
            <i className="fa fa-search"></i>
          </div>
          <h3>No blogs found</h3>
          <p>Try another search term or speciality.</p>
          <button type="button" onClick={clearFilters}>View All Blogs</button>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Blog pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <i className="fa fa-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type="button"
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </nav>
      )}
    </div>
  );
}

export default BlogAll;
