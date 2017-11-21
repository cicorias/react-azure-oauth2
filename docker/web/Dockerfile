FROM nginx:1.13

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./default.dev.conf /root/default.dev.conf

COPY ./ /usr/share/nginx/html
COPY ./loadEnvAndRun.sh /root/loadEnvAndRun.sh
RUN chmod 0555 /root/loadEnvAndRun.sh

# ------------------------
# SSH Server support
# ------------------------
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd

COPY ./sshd_config /etc/ssh/

EXPOSE 2222 80

ENTRYPOINT ["bash", "/root/loadEnvAndRun.sh"]