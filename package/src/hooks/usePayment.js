import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const usePayment = () => {
  const { user } = useAuthContext();
  const [course, setCourse] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState("none");

  const [cardHolderName, setCardname] = useState("John Doe");
  const [cardNumber, setCardnumber] = useState("5528790000000008");
  const [expireMonth, setMonth] = useState("12");
  const [expireYear, setYear] = useState("2030");
  const [cvc, setCvc] = useState("123");

  const [vis, setVis] = useState("hidden");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function get_cart() {
      try {
        const userid = await user.id;
        const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          setCourse(json.courses);
          setTotal(json.total);
          console.log(json);
        } else {
          setCourse(null);
          console.log("hata");
        }
      } catch (error) {
        console.error(error);
      }
    }
    get_cart();
  }, [user]);

  const payment = async () => {
    const info = { cardHolderName, cardNumber, expireMonth, expireYear, cvc, course, total };
    console.log(info);

    try {
      let response = await fetch("http://localhost:3000/api/payments", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      response = await response.json();

      console.log(response);

      if (response.message.status === "success") {
        setMessage("Ödeme başarılı!");
        setCardname("");
        setCardnumber("");
        setMonth("");
        setYear("");
        setCvc("");
        boughtCourseAdd();
        resetCart();

        setVis("visible");
      }
      if (response.message.status === "failure") {
        setVis("visible");
        setMessage(response.message.errorMessage + ".");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletecourse = async (courseData) => {
    try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/courses`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ courseData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetCart = async () => {
    try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/courses/reset`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const boughtCourseAdd = async () => {
    try {
      const userid = user.id;
      const response = await fetch(`http://localhost:3000/api/user/${userid}/boughtcourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ course }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    course,
    total,
    form,
    cardHolderName,
    cardNumber,
    expireMonth,
    expireYear,
    cvc,
    vis,
    message,
    setForm,
    setCardname,
    setCardnumber,
    setMonth,
    setYear,
    setCvc,
    setVis,
    setMessage,
    payment,
    deletecourse,
    resetCart,
    boughtCourseAdd,
  };
};

export default usePayment;
