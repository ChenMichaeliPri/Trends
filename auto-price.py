import csv
import random
from datetime import datetime, timedelta


def main():
    # Define the start and end dates
    start_date = datetime.strptime("22/06/2023", "%d/%m/%Y")
    end_date = datetime.strptime("21/06/2024", "%d/%m/%Y")

    # Generate the dates
    delta = end_date - start_date
    dates = [(start_date + timedelta(days=i)).strftime("%d/%m/%Y") for i in range(delta.days + 1)]

    # Define other fixed values
    product_id = 5
    shop_id = 2

    # Define periods for trend changes
    trend_periods = [
        (start_date, start_date + timedelta(days=100), (600, 550)),
        (start_date + timedelta(days=101), start_date + timedelta(days=200), (550, 500)),
        (start_date + timedelta(days=201), start_date + timedelta(days=300), (500, 550)),
        (start_date + timedelta(days=301), end_date, (550, 400))
    ]

    # Generate CSV data
    data = []
    unique_id = 3372
    for date_str in dates:
        date = datetime.strptime(date_str, "%d/%m/%Y")
        for start, end, price_range in trend_periods:
            if start <= date <= end:
                price = round(random.uniform(*price_range), 2)
                data.append([unique_id, product_id, shop_id, price, date_str])
                unique_id += 1
                break

    #print(data)

    file_path = 'product_prices_trend.txt'
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["unique_id", "product_id", "shop_id", "price", "date"])
        writer.writerows(data)

    print(f"CSV file '{file_path}' created successfully.")


if __name__ == '__main__':
    main()


'''
# Write to CSV
'''

'''
4104,1,3
4470,2,3
4836,3,3
5202,4,3
5568,5,3
5934,6,3


367,5,1

1 - 70
2 - 100
3 - 300
4 - 60
5 - 600
6 - 2000
'''