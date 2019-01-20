import { saveCurCoords, saveCurShapeColor, saveCurShapeType, saveCurStatus, saveGrid } from './actions/shape.js';

export const mapStateToProps = (state) => ({
    coords: state.coords,
    color: state.color,
    type: state.type,
    status: state.status,
    grid: state.grid
})

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveCurCoords: (...args) => {
            dispatch(saveCurCoords(...args))
        },
        saveCurShapeColor: (...args) => {
            dispatch(saveCurShapeColor(...args))
        },
        saveCurShapeType: (...args) => {
            dispatch(saveCurShapeType(...args))
        },
        saveCurStatus: (...args) => {
            dispatch(saveCurStatus(...args))
        },
        saveGrid: (...args) => {
            dispatch(saveGrid(...args))
        }
    }
}
