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
    
        // Apply local transformation using this.trs
        var localTransform = this.trs.getTransformationMatrix();
    
        // Combine parent transformations with the current node's local transformation
        var transformedModel = MatrixMult(modelMatrix, localTransform);
        var transformedModelView = MatrixMult(modelView, localTransform);
        var transformedMvp = MatrixMult(mvp, localTransform);
    
        // Correctly recalculate the normal matrix for lighting
        var transformedNormals = inverse(transpose(transformedModel)); // Fix: Use model matrix
    
        // Draw the MeshDrawer with updated transformations
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Recursively propagate transformations to children nodes
        for (var child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    
    

    

}