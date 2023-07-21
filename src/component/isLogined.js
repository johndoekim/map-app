const isLogined = () =>



    !!sessionStorage.getItem('token')


export default isLogined;