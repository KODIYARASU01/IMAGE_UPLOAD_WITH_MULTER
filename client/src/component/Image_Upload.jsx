import React, { useEffect, useRef, useState } from "react";
import "./Image_Upload.scss";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Image_Upload = () => {
  let [Data, setData] = useState([]);
  let [image, setImage] = useState(null);
  let [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let fetchImage = async () => {
      setLoader(true);
      await axios
        .get("http://localhost:3000/upload")
        .then((res) => {
          setData(res.data.data);
          // toast.success(res.data.message, {
          //   position: "top-center",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          //   transition: Slide,
          // });
          setLoader(false);
        })
        .catch((Error) => {
          toast.error(Error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
          setLoader(false);
        });
    };
    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    await axios
      .post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        navigate("/");
        setLoader(false);
      })
      .catch((err) => {
        toast.success(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setLoader(false);
      });
    let fetchImage = async () => {
      await axios
        .get("http://localhost:3000/upload")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((Error) => {
          toast.error(Error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
          setLoader(false);
        });
    };
    fetchImage();
    // Refresh data every 60 seconds
    const refreshInterval = setInterval(fetchImage, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  };

  let inputRef = useRef(null);

  //Handle Delete:
  const handleDelete = (e) => {
    e.preventDefault();
    let id = e.target;
    console.log(id);
    console.log(id.id);

    axios
      .delete(`http://localhost:3000/upload/${id.id}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="image_upload_container">
        <div className="header">
          <h3>Image Upload With Multer</h3>
        </div>

        <div className="form_container">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form_submit">
              <button type="submit">Upload</button>
            </div>
          </form>
        </div>

        <div className="image_container">
          <div className="box">
            {Data.map((picture, index) => {
              const base64String = btoa(
                new Uint8Array(picture.image.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              return (
                <div className="image" key={index}>
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    alt="image"
                  />
                  <div className="delete" onClick={(e) => handleDelete(e)}>
               
                    <img
                      id={picture._id}
                      ref={inputRef}
                      width="64"
                      height="64"
                      src="https://img.icons8.com/arcade/64/delete-forever.png"
                      alt="delete-forever"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {loader ? <span className="loader"></span> : ""}
      </div>
    </>
  );
};

export default Image_Upload;
