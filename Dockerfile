FROM python:3.14-alpine

RUN apk -U upgrade \
    && apk add bash curl

WORKDIR /workspace

COPY ./src ./src
COPY requirements.txt .
COPY log_conf.yaml .

RUN pip install -U pip
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 9009

CMD ["uvicorn", "src.main:app", "--port=9009", "--log-config=log_conf.yaml", "--host", "0.0.0.0"]
