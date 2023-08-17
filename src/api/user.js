import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'get',
  })
}

export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

// 新增部门  /company/department
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method:'POST',
    data
  })
}

// 编辑部门
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method:'PUT',
    data
  })
}

// 新增角色
export function setRole(data) {
  return request({
    url: '/sys/role',
    data,
    method:'POST'
  })
}

// 获取角色信息
export function getDataRole(params) {
  return request({
    url: '/sys/role',
    params
  })
}

//更新角色信息
export function upDataRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除角色
export function delRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method:'DELETE',
    data
  })
}

//获取员工列表
export function getDataUser(params) {
  return request({
    url: '/sys/user',
    params
  })
}

//添加员工
export function getaddUser(data) {
  return request({
    url: '/sys/user',
    data,
    method:'POST'

  })
}

//根据id查找员工详情
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

//保存员工基本信息
export function getEditUser(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

// 导出员工的excel
export function exportEmployee() {
  return request({
    url: `/sys/user/export`,
    responseType: 'blob', // 默认值
  })
}

// 导入员工的excel sys/user/import
export function importEmployee(data) {
  return request({
    url: `sys/user/import`,
    method:'POST',
    data   //formData类型  因为要上传文件
   })
}

//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles() {
  return request({
    url: `/sys/role/list/enabled`
  })
}

// 分配角色
export function assignRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method:"PUT",
    data
  })
}

//获取权限  
export function getPermission() {
  return request({
    url: `/sys/permission`
  })
}


// 获取角色详情信息
export function getRole(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 分配权限
export function getassign(data) {
  return request({
    url: `/sys/role/assignPrem`,
    method:"PUT",
    data
  })
}


// 添加权限点
export function getaddPermiss(data) {
  return request({
    url: '/sys/permission',
    data,
    method:'POST'
  })
}


// 获取权限点详情信息
export function getPermiss(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}


// 更新权限
export function getEditPermiss(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method:"PUT",
    data
  })
}


// 删除权限点
export function delPermiss(data) {
  return request({
    url: `/sys/permission/${data}`,
    method:'DELETE'
  })
}