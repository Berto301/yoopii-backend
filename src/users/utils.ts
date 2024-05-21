export const deleteOneBy = (condition, models) =>
new Promise((resolve, reject) => {
    try {
    let Models = models;
    Models.deleteOne(condition).then(
        (response) => {
        resolve(response);
        },
        (error) => {
        reject(error);
        }
    );
    } catch (error) {
    reject(error);
    }
});

export const findOneAndRemove = (_id, models) =>
new Promise((resolve, reject) => {
    try {
    let Model = models;
    Model.findOneAndRemove(
        {
        _id
        },
        { useFindAndModify: false }
    ).then(
        (res) => {
        resolve(res);
        },
        (error) => {
        reject(error);
        }
    );
    } catch (error) {
    reject(error);
    }})

   export const deleteManyby = (condition, models) =>
    new Promise((resolve, reject) => {
        try {
        let Models = models;
        Models.delete(condition).then(
            (response) => {
            resolve(response);
            },
            (error) => {
            reject(error);
            }
        );
        } catch (error) {
        reject(error);
        }
    });