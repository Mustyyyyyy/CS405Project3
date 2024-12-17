/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
    

        var localTransform = this.trs.getTransformationMatrix();//getting the local transformation matrix of the current node
    

        var transformedModel = MatrixMult(modelMatrix, localTransform);//combining the parent's model matrix with the current node's local information, 
        //it represents the final model matrix for this node, including the parent transformations

        var transformedModelView = MatrixMult(modelView, localTransform);//this line combines the parent's modelViewMatrix with the current node's local transformation
        var transformedMvp = MatrixMult(mvp, localTransform);//combining the parent's MVP matrix with the current node's local transformation
    
        // Correctly recalculate the normal matrix for lighting
        var transformedNormals = inverse(transpose(transformedModel)); // Fix: Use model matrix(here was problematic and the issue is fixed)
        //this part ensures that the surface normals are transformed correctly
    
        // Draw the MeshDrawer with updated transformations
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
            // Passing the updated matrices to the meshDrawer to render the node with proper transformations.
        }
    
        // Recursively propagate transformations to children nodes, which is the backbone of sceneGraph
        for (var child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    
    

    

}
