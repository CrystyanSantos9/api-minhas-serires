const { default: mongoose } = require("mongoose");

const CategorySchema = mongoose.Schema({
  comment: String,
});

//cria esquema = objeto para banco
const CountsSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: [String],
  user_id: {
    type: String,
    required: true,
  },
});

const Count = mongoose.model("MinhasContas", CountsSchema);

module.exports = Count;
