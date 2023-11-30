import { ReactElement } from 'react'
import Layout from '../Layout'
import { Button, Grid, IconButton, TextField } from '@mui/material'
import MuiTable, { HeadCell } from 'common/components/TableMui'
import { AugmentedUser } from 'common/types/user'
import { Icon, Modal, SelectInput } from 'common/components'
import { useDashboard } from './hooks/useDashboard'

const getColumns = (): HeadCell<AugmentedUser>[] => {
  return [
    {
      title: `First Name`,
      key: `firstName`,
    },
    {
      title: `Last Name`,
      key: `lastName`,
    },
    {
      title: `Email`,
      key: `email`,
    },
    {
      title: `Role`,
      key: `role`,
      render: (data: AugmentedUser): JSX.Element => <>{data.role.name}</>,
    },
  ]
}
const columns = getColumns()
const Dashboard = (): JSX.Element => {
  const {
    user,
    users,
    roles,
    isModalOpen,
    onRowClick,
    onCloseModal,
    toggleShowPassword,
    showPassword,
    openModal,
  } = useDashboard()

  return (
    <Grid container direction="column">
      <Modal
        title={user.id ? `Update user` : `Create New user`}
        isOpen={isModalOpen}
        onCancel={onCloseModal}
        onConfirm={onCloseModal}
      >
        <Grid container p={3} gap={1} flexDirection="column">
          <TextField placeholder="First Name" defaultValue={user.firstName} />
          <TextField placeholder="Last Name" defaultValue={user.lastName} />
          <TextField
            type="email"
            placeholder="Email"
            defaultValue={user.email}
          />
          <SelectInput
            options={roles}
            placeholder="Role"
            defaultValue={user.role?.id}
          />
          <TextField
            type={showPassword ? `text` : `password`}
            placeholder="Password"
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleShowPassword}>
                  <Icon
                    icon={showPassword ? `visibilityOff` : `visibility`}
                    sx={{ color: `black` }}
                  />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Modal>
      <Button
        sx={{ width: `100px`, alignSelf: `end`, marginBottom: `4px` }}
        onClick={openModal}
      >
        New user
      </Button>
      <MuiTable
        columns={columns}
        onRowClick={onRowClick}
        rows={users}
        withSelection
      />
    </Grid>
  )
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
