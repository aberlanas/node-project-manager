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
    dataIndex: "nombre",
    title: "Nombre",
  }
];

//Contenido de la tabla derecha
const rightTableColumns = [
  {
    dataIndex: "nombre",
    title: "Nombre",
  },
];

const TransferTechForm = ({ users, techs, project, editProject}) => {
  //const leftUsers = users.filter(user => {user.id project.users);
  //const rightUsers = users.filter(user => {user.id}); 

  const leftTechs = techs.filter(tech => {
    return !project.tecnologias.map(tp => {return tp.id}).includes(tech.id)
  });

  const rightTechs = techs.filter(tech => {
    return project.tecnologias.map(tp => {return tp.id}).includes(tech.id)
  });

  const rightTechsKey = rightTechs.map(tech => {return tech.key})

  const [state, setState] = useState({
    targetKeys: rightTechsKey,
    disabled: false,
    showSearch: false,
  });
  console.log(state.targetKeys);
  const { targetKeys, disabled, showSearch } = state;

  console.log(leftTableColumns);
  const onChanged = (nextTargetKeys) => {
    setState({ targetKeys: nextTargetKeys });
    console.log(nextTargetKeys);
    project.tecnologias=techs.filter(tech => {
      return nextTargetKeys.includes(tech.id)
    });
    console.log(project.tecnologias);
    editProject(project);
  };

  return (
    <div className="transferTableUsersTechs">
      <TableTransfer
        dataSource={techs}
        targetKeys={targetKeys}
        disabled={false}
        showSearch={true}
        onChange={onChanged}
        filterOption={(inputValue, item) =>
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

export default connect(mapStateToProps, {editProject})(TransferTechForm);
