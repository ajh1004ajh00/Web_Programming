import socket
import os
import threading

# 서버 설정
HOST = '0.0.0.0'  # 모든 인터페이스에서 접속 허용
PORT = 6789  # 지정한 포트 번호

def handle_request(client_connection):
    try:
        # 클라이언트로부터 요청 받기
        request = client_connection.recv(1024).decode()
        print(request)

        # 요청에서 파일명을 추출
        headers = request.split('\n')
        requested_file = headers[0].split()[1][1:]  # URL에서 파일명 추출
        print(f"Requested file: {requested_file}")  # 요청한 파일명을 출력

        # 현재 디렉토리에서 파일 경로 확인
        file_path = os.path.join(os.getcwd(), requested_file)
        print(f"Full file path: {file_path}")  # 절대 경로 출력

        # 파일이 존재하면 읽어서 응답
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    response_body = file.read()
                    print(f"File content:\n{response_body}")  # 파일 내용을 확인하기 위해 출력
                response_header = 'HTTP/1.1 200 OK\r\n'
            except Exception as e:
                print(f"Error reading file: {e}")
                response_body = "<h1>500 Internal Server Error</h1>"
                response_header = 'HTTP/1.1 500 Internal Server Error\r\n'
        else:
            response_body = "<h1>404 Not Found</h1>"
            response_header = 'HTTP/1.1 404 Not Found\r\n'

        # 응답 헤더 및 본문 전송
        response_header += 'Content-Type: text/html; charset=utf-8\r\n\r\n'
        response = response_header + response_body
        client_connection.sendall(response.encode())
    except Exception as e:
        print(f"Error handling request: {e}")
    finally:
        client_connection.close()

def start_server():
    # 소켓 설정 및 바인딩
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((HOST, PORT))
    server_socket.listen(5)  # 최대 5개의 연결 허용
    print(f"HTTP 서버가 {HOST}:{PORT}에서 실행 중입니다...")

    while True:
        # 클라이언트 연결 수락
        client_connection, client_address = server_socket.accept()
        print(f"Connection established with {client_address}")

        # 각 클라이언트 요청을 스레드로 처리
        client_thread = threading.Thread(target=handle_request, args=(client_connection,))
        client_thread.start()

if __name__ == '__main__':
    start_server()
