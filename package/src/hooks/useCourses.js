import { useState, useEffect } from 'react';

const useCourses = (user) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState("hidden");

  const [err2,setErr2] = useState(false)
  const [text,setText] = useState("")


  const getCourses = async (endpoint)=>{
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {},
      });

      const json = await response.json();

      if (response.ok) {
        setCourses(json);
        console.log(json);
      } else {
        console.log("hata");
      }

    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  const addCourse = async (courseData) => {
    try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ courseData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setText(data.message);
        setErr2(false);
        setIsVisible("visible");
        setTimeout(() => {
          setIsVisible("hidden");
        }, 2000);

      } else {
        setErr2(true);
        const data = await response.json();
        setText(data.error);
        setIsVisible("visible");
        setTimeout(() => {
          setIsVisible("hidden");
        }, 2000);
      }

    } catch (err) {
      console.log(err);
      setError(err);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return {
    getCourses,
    courses,
    addCourse,
    error,
    text,
    err2,
    isVisible,
  };
};

export default useCourses;
