from flask import Flask,jsonify
from flask_cors import CORS, cross_origin

import json
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_boston
#from sklearn.linear_model import LinearRegression
import numpy as np
import pickle
import math

class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

data = load_boston()
print ("--==Initializing ML-model==--")
_, X_test, _, y_test = train_test_split(data.data, data.target, test_size=0.2)
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/header', methods=['GET'])
def get_header():
    dumped = json.dumps(data.feature_names, cls=NumpyEncoder)
    return jsonify({'result': dumped})


@app.route('/predict/<int:ofset>', methods=['GET'])
def get_predict(ofset):
    shp = np.array(X_test.shape).flatten()
    #shp= shp.flatten()
    print(ofset)
    print(math.trunc(shp[0]/10))
    print(ofset<math.trunc(shp[0]/10))
    if (ofset<(shp[0]//10)):
        if (ofset==0):
            slc = X_test[0:10]
            prd = model.predict(slc)
            target = y_test[0:10]
        else:
            slc = X_test[(ofset*10):(10+10*ofset)]
            prd = model.predict(slc)
            target = y_test[(ofset*10):(10+10*ofset)]
        t_prd=prd.reshape(10,1)
        t_target=target.reshape(10,1)
        result={
            'Y':np.concatenate([t_target,t_prd],axis=1),
            'predict':prd,
            'target':target,
            'X':np.concatenate([slc,t_target,t_prd],axis = 1)
        }    
        dumped = json.dumps(result, cls=NumpyEncoder)
        return jsonify({'result': dumped})        
    else:
        return jsonify({'result':[]})
if __name__ == '__main__':
    app.run(debug=True)

