import { ReactElement } from 'react'
import Layout from '../Layout'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import MuiTable, { HeadCell } from 'common/components/TableMui'
import { AugmentedUser } from 'common/types/user'
import { Icon, Modal, SelectInput } from 'common/components'
import { useDashboard } from './hooks/useDashboard'
import { MODAL_TYPES } from './types'

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
      render: (data: AugmentedUser): JSX.Element => {
        let roleName = ``
        if (typeof data.role === `object`) {
          roleName = data.role.name
        }
        return <>{roleName}</>
      },
    },
  ]
}
const columns = getColumns()
const Dashboard = (): JSX.Element => {
  const {
    user,
    users,
    roles,
    openUpsertModal,
    onRowClick,
    onCloseModal,
    toggleShowPassword,
    showPassword,
    modalType,
    selectedUsersIds,
    setSelectedUsersIds,
    openDeleteModal,
    closeModal,
    onDeleteUsers,
    onUpsertUser,
    onChangeEmail,
    onChangeFirstName,
    onChangeLastName,
    onChangeRole,
    onChangePassword,
  } = useDashboard()

  return (
    <Grid container direction="column">
      <Modal
        title="Delete users"
        isOpen={modalType === MODAL_TYPES.DELETE}
        onCancel={closeModal}
        onConfirm={onDeleteUsers}
      >
        <Grid container p={3} gap={1} flexDirection="column">
          <Typography sx={{ color: `black`, fontWeight: `bold` }}>
            Are you sure you want to delete {selectedUsersIds.length} users?
          </Typography>
        </Grid>
      </Modal>

      <Modal
        title={user.id ? `Update user` : `Create New user`}
        isOpen={modalType === MODAL_TYPES.UPSERT}
        onCancel={onCloseModal}
        onConfirm={onUpsertUser}
        confirmText={user.id ? `UPDATE` : `CREATE`}
      >
        <Grid container p={3} gap={1} flexDirection="column">
          <TextField
            placeholder="First Name"
            defaultValue={user.firstName}
            onChange={(event) => onChangeFirstName(event.target.value)}
          />
          <TextField
            placeholder="Last Name"
            defaultValue={user.lastName}
            onChange={(event) => onChangeLastName(event.target.value)}
          />
          <TextField
            type="email"
            placeholder="Email"
            defaultValue={user.email}
            onChange={(event) => onChangeEmail(event.target.value)}
          />
          <SelectInput
            options={roles}
            placeholder="Role"
            defaultValue={user?.role?.id}
            onChange={(event) => onChangeRole(Number(event.target.value))}
          />
          {user.id == null ? (
            <TextField
              type={showPassword ? `text` : `password`}
              placeholder="Password"
              onChange={(event) => onChangePassword(event.target.value)}
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
          ) : null}
        </Grid>
      </Modal>
      <Grid container justifyContent="flex-end">
        {selectedUsersIds.length > 0 ? (
          <Button
            sx={{ marginBottom: `4px`, marginRight: `4px` }}
            onClick={openDeleteModal}
          >
            Delete({selectedUsersIds.length}) selected
          </Button>
        ) : null}

        <Button sx={{ marginBottom: `4px` }} onClick={openUpsertModal}>
          New user
        </Button>
      </Grid>
      <MuiTable
        columns={columns}
        onRowClick={onRowClick}
        rows={users}
        rowsPerPage={5}
        withSelection
        onSelectionChange={setSelectedUsersIds}
      />
    </Grid>
  )
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
