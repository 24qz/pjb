const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userdata.staffPhoto,
  name: state => state.user.userdata.username,
  routes:state=>state.user.routes
}
export default getters
