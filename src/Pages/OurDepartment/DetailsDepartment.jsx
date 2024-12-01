import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function DetailsDepartment() {
  const [Neospecial, setNeospecial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv1/view-category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNeospecial(data.category);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  const { departid } = useParams();
  const departments = Neospecial.find((value) => value.slug === departid);
  if (!departments) {
    return (
      <>
        Department not found doctorslug = {departments} and doctor {departid}
      </>
    );
  }

  return (
    <>
      <Helmet>{parse(departments.seo_tag)}</Helmet>
      <section className="container NeoSpeciality">
        <div>
          <h3 className="dt-title">
            <span>{departments.title}</span>
          </h3>
        </div>
      </section>
      <section className="container NeoSpecialityDetails">
        <div className="row">
          <div className="col-md-4">
            <div>
              <aside>
                <div className="sidebar">
                  {Neospecial.map((value) => {
                    return (
                      <>
                        <div className="card-body">
                          <Link
                            to={`https://www.neohospital.com/${value.slug}`}
                          >
                            <h2>
                              <i className="fa fa-hand-o-right"> </i>
                              {value.title}
                            </h2>
                          </Link>

                          <hr />
                        </div>
                      </>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
          <div className="col-md-8">
            <main>
              <div>
                <img
                  src={`https://api.neohospital.com/uploads/categories/${departments.image}`}
                  alt={departments.title}
                  className="img-fluid"
                  srcSet=""
                />
              </div>

              {/* <div>
                <h1>{departments.title}</h1>
              </div> */}
              <div className="description">
                <div>{parse(departments.content)}</div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsDepartment;
