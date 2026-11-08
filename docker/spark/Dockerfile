FROM apache/spark:4.1.4-java17

USER root

RUN mkdir -p /opt/spark-apps

WORKDIR /opt/spark-apps

COPY streaming/spark/jobs/ /opt/spark-apps/jobs/

USER 185
