import { useForm } from "react-hook-form"
import LoadingModal from "./LoadingModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";



const BoardSignUp = () =>{

    const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();
    const [loading, setLoading] = useState(false);

    const history = useHistory();




    const onSubmit = async data => { 
        setLoading(true)

        try{
            const body = 
            {
            'username' : data.username,
            'password' : data.password,
            'nickname' : data.nickname,
            'email' : data.email,
                            }
        const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/signup', body)
        console.log(res.status)
        if (res.status === 200){
            alert('회원 가입에 성공하셨습니다.')
            history.push('/BoardSignIn')
        }

        }
        catch(err){console.log(err.response.data.errorMessage)
        if (err.response.data.errorMessage === 'already exist username.'){
            alert('이미 존재하는 아이디 입니다.')
        }
        else if (err.response.data.errorMessage === 'already exist email.'){
            alert('이미 존재하는 이메일 입니다.')
        }
        else if (err.response.data.errorMessage === 'already exist nickname.'){
            alert('이미 존재하는 닉네임 입니다.')
        }
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
                    <Card.Title>회원가입</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
      
                      {/* username */}
                      <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="username"
                          {...register("username", {
                            required: true,
                            minLength: 2,
                            maxLength: 15,
                            pattern: /^[A-Za-z0-9\s]+$/iu,
                          })}
                        />
                        {errors.username && (
                            <Form.Text className="text-muted mb-3">
                        {errors?.nickname?.type === "required" && <p>필수 입력 항목입니다.</p>}
                        {errors?.nickname?.type === "minLength" && <p>두 글자 이상으로 설정해 주세요.</p>}
                        {errors?.nickname?.type === "maxLength" && <p>십 글자 초과 설정이 불가합니다.</p>}
                        {errors?.nickname?.type === "pattern" && <p>영어, 숫자 이외 입력이 불가능합니다.</p>}
                        </Form.Text>
                        )}
                      </Form.Group>
      
                      {/* password */}
                      <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="password"
                          {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 15,
                            pattern: /^[A-Za-z가-힣0-9\s~!@#$%]+$/iu,
                          })}
                        />
                        {errors.password && (
                          <Form.Text className="text-muted mb-3">
                            {errors?.password?.type === "required" && <p>필수 입력 항목입니다.</p>}
                            {errors?.password?.type === "minLength" && <p>여덟 글자 이상으로 설정해 주세요.</p>}
                            {errors?.password?.type === "maxLength" && <p>십 오 글자보다는 작게 설정해 주세요.</p>}
                            {errors?.password?.type === "pattern" && <p>한글, 영어, 숫자, 특수문자로만 사용해주세요.</p>}
                          </Form.Text>
                        )}
                      </Form.Group>
      
                      {/* confirm_password */}
                      <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="confirm_password"
                          {...register("confirm_password", {
                            required: true,
                            validate: (value) => {
                              if (watch("password") !== value) {
                                return "비밀번호와 일치하지 않습니다.";
                              }
                            },
                          })}
                        />
                        {errors.confirm_password && (
                          <Form.Text className="text-muted mb-3">
                            {(errors?.confirm_password?.type === "required" ||
                             errors?.confirm_password?.type === "validate") && (
                              <p>{errors?.confirm_password?.message}</p>
                            )}
                          </Form.Text>
                        )}
                      </Form.Group>
      
                      {/* nickname */}
                      <Form.Group controlId="formNickname" className="mb-3">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="nickname"
                          {...register("nickname", {
                            required: true,
                            minLength: 2,
                            maxLength: 10,
                            pattern: /^[A-Za-z가-힣0-9\s]+$/iu,
                          })}
                        />
                        {errors.nickname && (
                          <Form.Text className="text-muted mb-3">
                            {errors?.nickname?.type === "required" && <p>필수 입력 항목입니다.</p>}
                            {errors?.nickname?.type === "minLength" && <p>두 글자 이상으로 설정해 주세요.</p>}
                            {errors?.nickname?.type === "maxLength" && <p>십 글자 초과 설정이 불가합니다.</p>}
                            {errors?.nickname?.type === "pattern" && <p>영어, 숫자 이외 입력이 불가능합니다.</p>}
                          </Form.Text>
                        )}
                      </Form.Group>
      
                      {/* email */}
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="email"
                          {...register("email", {
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                        />
                        {errors.email && (
                          <Form.Text className="text-muted mb-3">
                            {errors?.email?.type === "required" && <p>필수 입력 항목입니다.</p>}
                            {errors?.email?.type === "pattern" && <p>이메일주소가 유효하지 않습니다.</p>}
                          </Form.Text>
                        )}
                      </Form.Group>
      
                      <Form.Group className="mt-3">
                  <Button type="submit" variant="success">
                    등록
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




export default BoardSignUp


