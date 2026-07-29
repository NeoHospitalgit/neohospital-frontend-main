import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaSearch, FaArrowRight } from "react-icons/fa";
import "./ProceduresMain.css";

function ProceduresMain() {
  const API =
    process.env.REACT_APP_API_URL || "https://api.neohospital.com/api";

  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/adminv12/public-procedures`
      );

      const data = await response.json();

      const list = Array.isArray(data)
        ? data
        : data?.data || [];

      setProcedures(list);
      setFilteredProcedures(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    if (!search.trim()) {
      setFilteredProcedures(procedures);
      return;
    }

    const keyword = search.toLowerCase();

    const result = procedures.filter((item) =>
      item?.procedures_title
        ?.toLowerCase()
        .includes(keyword)
    );

    setFilteredProcedures(result);
  }, [search, procedures]);

  return (
    <section className="procedures-page">

      <div className="container">

        {/* Heading */}

        <div className="procedure-heading">

          <div>

            <span>NEO Hospital</span>

            <h2>Find By Procedures</h2>

          </div>

          <div className="total-procedure">
            {filteredProcedures.length} Procedures
          </div>

        </div>

        {/* Search */}

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

        {/* Loading */}

        {loading ? (
          <div className="procedure-loading">
            Loading Procedures...
          </div>
        ) : (

          <div className="procedure-grid">

            {filteredProcedures.length > 0 ? (

              filteredProcedures.map((item) => (

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

              ))

            ) : (

              <div className="no-procedure">

                No Procedure Found

              </div>

            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default ProceduresMain;
