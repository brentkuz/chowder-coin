function Rate(id, type, rate, percentChange) {
    this.Id = id;
    this.Type = type;
    this.Rate = rate;
    this.Change = percentChange;
};

function Denomination(value, text) {
    this.Value = value;
    this.Text = text;
}

function StoreItem(id, title, price, count) {
    this.Id = id;
    this.Title = title;
    this.Price = price;
    this.Count = count;
}