
enum ActiveStatus {
  A = 'active',
  D = 'deleted'
}

const getActiveStatus = (active_status) => {
  if (active_status != ActiveStatus.A && active_status !== ActiveStatus.D) {
    return ActiveStatus.A;
  }
  return active_status;
}

export { ActiveStatus, getActiveStatus }
