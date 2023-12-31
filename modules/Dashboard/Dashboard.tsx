import { ReactElement } from 'react'
import Layout from '../Layout'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import MuiTable, { HeadCell } from 'common/components/TableMui'
import { AugmentedUser } from 'common/types/user'
import { Icon, Modal, SelectInput } from 'common/components'
import { useDashboard } from './hooks/useDashboard'
import { MODAL_TYPES } from './types'
import { Controller } from 'react-hook-form'
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
      render: (user: AugmentedUser): JSX.Element => {
        return <>{user.role.name}</>
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
    handleSubmit,
    errors,
    control,
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
        onConfirm={handleSubmit(onUpsertUser)}
        confirmText={user.id ? `UPDATE` : `CREATE`}
      >
        <Grid container p={3} gap={1} flexDirection="column">
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                placeholder="First Name"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                error={!!errors?.firstName?.message}
                helperText={errors?.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                placeholder="Last Name"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                error={!!errors?.lastName?.message}
                helperText={errors?.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                placeholder="Email"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                options={roles}
                placeholder="Role"
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                helperText={errors?.role?.message}
                error={!!errors?.role?.message}
              />
            )}
          />

          {user.id == null ? (
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type={showPassword ? `text` : `password`}
                  placeholder="Password"
                  onChange={(event) => onChange(event.target.value)}
                  value={value}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
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
              )}
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
