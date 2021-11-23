import React from "react";
import {Tree, TreeProps} from "antd";
import {DataNode} from "rc-tree/lib/interface";

export type HierarchyTreeNode = Omit<DataNode, "children" | "key"> & {
  id: string,
  _instanceName: string,
  [parentId: string]: string,
};

export type EntityHierarchyTreeProps = Omit<TreeProps, "treeData"> & {
  hierarchyProperty?: string,
  items?: HierarchyTreeNode[],
};

export const EntityHierarchyTree = ({
  hierarchyProperty, items, ...rest} : EntityHierarchyTreeProps
) => {
  return (
    <Tree {...rest} treeData={toTreeData(items, hierarchyProperty)} />
  )
}

const toTreeData = (items?: HierarchyTreeNode[], hierarchyProperty?: string) => {
  if (items === undefined) return;
  const hashTable : {[nodeId: string] : DataNode} = Object.create(null);
  items.forEach(item => {
    const {id, _instanceName, ...commonData} = item
    if (hierarchyProperty !== undefined) {
      delete commonData[hierarchyProperty]
    }
    hashTable[item.id] = {...commonData, children: [], key: id, title: _instanceName}
  });
  const treeData : DataNode[] = [];
  items.forEach(item => {
    const parentId = hierarchyProperty === undefined ? undefined : item[hierarchyProperty];
    const nodeData = hashTable[item.id]
    if(parentId) {
      hashTable[parentId].children?.push(nodeData)
    } else {
      treeData.push(nodeData)
    }
  });
  return treeData;
};



