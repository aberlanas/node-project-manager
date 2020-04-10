//antd
import { Transfer, Switch, Table, Tag } from "antd";
import difference from "lodash/difference";

//React
import React, { useEffect, useCallback, useState } from "react";

//Helpers
import Http from "../../Helpers/Http";

//Redux
import { connect } from "react-redux";
import { readAllUsers } from "../../Redux/Reducers/UserReducer";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import { readProject } from "../../Redux/Reducers/ProjectReducer";
import { editProject } from "../../Redux/Actions/ProjectActions";

//Esto es la tabla y cómo se rellena
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

//Contenido la tabla izquierda
const leftTableColumns = [
  {
    dataIndex: "nickname",
    title: "Nickname",
  }
];

//Contenido de la tabla derecha
const rightTableColumns = [
  {
    dataIndex: "nickname",
    title: "Nickname",
  },
];

const TransferFormTeachers = ({ users, techs, project, editProject}) => {
  //const leftUsers = users.filter(user => {user.id project.users);
  //const rightUsers = users.filter(user => {user.id}); 

  console.log("Tecnologías ", project.tecnologias);
  console.log("Usuarios ", project.usuarios);

  const leftUsers = users.filter(user => {
    return !project.usuarios.profesores.map(up => {return up.id}).includes(user.id)
  });

  const rightUsers = users.filter(user => {
    return project.usuarios.profesores.map(up => {return up.id}).includes(user.id)
  });

  const rightUsersKey = rightUsers.map(user => {return user.key})

  const [state, setState] = useState({
    targetKeys: rightUsersKey,
    disabled: false,
    showSearch: false,
  });
  console.log(state.targetKeys);
  const { targetKeys, disabled, showSearch } = state;

  console.log(leftTableColumns);
  const onChanged = (nextTargetKeys) => {
    setState({ targetKeys: nextTargetKeys });
    console.log(nextTargetKeys);
    project.usuarios.profesores=users.filter(user => {
      return nextTargetKeys.includes(user.id)
    });
    console.log(project.users);
    editProject(project);
  };

  return (
    <div className="transferTableUsersTechs">
      <TableTransfer
        dataSource={users}
        targetKeys={targetKeys}
        disabled={false}
        showSearch={true}
        onChange={onChanged}
        filterOption={(inputValue, item) =>
          item.nickname.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
          item.apellidos.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
          item.nombre.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: readAllUsers(state), techs: readAllTechs(state), project: readProject(state) };
};

export default connect(mapStateToProps, {editProject})(TransferFormTeachers);
