import { useState } from "react"
import LoadingModal from "./LoadingModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const BoardSignIn = () => {

    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();


    const history = useHistory();





    const onSubmit = async data =>{
        setLoading(true)

        try{
            const body = {
                'username' : data.username,
                'password' : data.password
            }
            const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signin', body)
            console.log(res.status)
            if(res.status === 200){
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('idx', res.data.idx)
                sessionStorage.setItem('nickname', res.data.nickname)
                alert('로그인이 성공하였습니다.')
                history.push('/mapmain')
            }
        }
        catch(err)
        {console.log(err.response.data.success)
        if(err.response.data.success === false)
        {alert('로그인에 실패하였습니다.')}
        }
        finally{setLoading(false)}
    
    }

    
    return (
        <>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Card>
                  <Card.Body>
                    <Card.Title>로그인</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ID"
                          {...register("username", { required: true })}
                        />
                        {errors.username?.type === "required" && (
                          <p className="error-message">필수 입력 항목입니다</p>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="비밀번호"
                          {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && (
                          <p className="error-message">필수 입력 항목입니다</p>
                        )}
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Button type="submit" variant="success">
                          로그인
                        </Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
      
}

export default BoardSignIn;