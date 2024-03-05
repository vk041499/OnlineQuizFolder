import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllExams } from "../../../apicalls/exams";
import { Col, Row, message } from "antd";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        console.log(response.data);
        setDataLoaded(true);
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);
 
   if (!dataLoaded) {
    // If data is not loaded, you can render a loading state or return null
    return <div>Loading...</div>;
  }
  
  
  return (
    <div>
      <PageTitle title={` Hi ${user.name}, Welcome to Quizee`} />
      <div className="divider"></div>
      {
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6}>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl">{exam.name}</h1>

                <h1 className="text-md">Category: {exam.category}</h1>
                <h1 className="text-md">Total Marks:{exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks:{exam.passingMarks}</h1>
                <h1 className="text-md">Duration:{exam.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      }
    </div>
  );
}

export default Home;
