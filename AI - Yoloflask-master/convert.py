import tensorflow as tf

model = tf.keras.models.load_model('./image')

model.save('./model/model.h5')