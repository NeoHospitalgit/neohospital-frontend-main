import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaSearch, FaArrowRight } from "react-icons/fa";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import "./ProceduresMain.css";
import { useAuth } from "../../store/auth";


function ProceduresMain() {
     const { API } = useAuth();
 

  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch Procedures
  // =====================================

  useEffect(() => {
    if (!API) return;
    const fetchProcedures = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API}/api/procedures/public-procedures`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch procedures: ${response.status}`
          );
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data?.data || [];

        setProcedures(list);
        setFilteredProcedures(list);

        const seoData =
          data?.seo_head ||
          data?.tagdata ||
          data?.seo ||
          null;

        if (seoData) {
          setSeo(seoData);
        }

      } catch (error) {
        console.error(
          "Procedures Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, [API]);

  // =====================================
  // Filter Procedures
  // =====================================

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProcedures(procedures);
      return;
    }

    const keyword =
      search.toLowerCase().trim();

    const result = procedures.filter(
      (item) =>
        item?.procedures_title
          ?.toLowerCase()
          .includes(keyword)
    );

    setFilteredProcedures(result);

  }, [search, procedures]);

  // =====================================
  // Render
  // =====================================

  return (
    <>
      {/* =====================================
          PROCEDURES SEO
      ===================================== */}

      {seo && (
        <Helmet>
          {parse(seo)}
        </Helmet>
      )}

      <section className="procedures-page">

        <div className="container">

          {/* =====================================
              Heading
          ===================================== */}

          <div className="procedure-heading">

            <div>
              <span>
                NEO Hospital
              </span>

              <h2>
                Find By Procedures
              </h2>
            </div>

            <div className="total-procedure">
              {filteredProcedures.length}{" "}
              Procedures
            </div>

          </div>

          {/* =====================================
              Search
          ===================================== */}

          <div className="procedure-search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search Procedure..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* =====================================
              Loading
          ===================================== */}

          {loading ? (

            <div className="procedure-loading">
              Loading Procedures...
            </div>

          ) : (

            <div className="procedure-grid">

              {filteredProcedures.length > 0 ? (

                filteredProcedures.map(
                  (item) => (

                    <Link
                      key={item._id}
                      to={`/procedures/${item.procedures_slug}`}
                      className="procedure-card"
                    >

                      <div className="procedure-icon">
                        <FaStethoscope />
                      </div>

                      <div className="procedure-info">

                        <h3>
                          {item.procedures_title}
                        </h3>

                      </div>

                      <div className="procedure-arrow">
                        <FaArrowRight />
                      </div>

                    </Link>

                  )
                )

              ) : (

                <div className="no-procedure">
                  No Procedure Found
                </div>

              )}

            </div>

          )}

        </div>

      </section>
    </>
  );
}

export default ProceduresMain;