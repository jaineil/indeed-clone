# zookeeper-server-start /opt/homebrew/etc/kafka/zookeeper.properties
# kafka-server-start /opt/homebrew/etc/kafka/server.properties

kafka-topics --create --replication-factor 1 --partitions 1 --topic chat --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic searches --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic job --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic company --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic job-seeker --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic job-application --bootstrap-server localhost:9092
kafka-topics --create --replication-factor 1 --partitions 1 --topic response_topic --bootstrap-server localhost:9092

#kafka-topics --list --bootstrap-server localhost:9092

#Windows
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chat
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic searches
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic job
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic company
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic job-seeker
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic job-application
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
